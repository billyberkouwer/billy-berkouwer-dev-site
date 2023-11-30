'use client'

import { adjust } from '@/lib/utils';
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { SkeletonHelper, Object3D, Object3DEventMap, SkinnedMesh, Bone, Vector3 } from "three"
import { createNoise4D } from "simplex-noise";
import Plant from "./Plant-2-bake-bones"

export default function HomepageScene() {
    const lightRef = useRef<Object3D<Object3DEventMap>>() as MutableRefObject<Object3D<Object3DEventMap>>;
    const noise = createNoise4D();
    const { scene, clock } = useThree();
    const gltf = useGLTF('/Plant-2-bake-bones.gltf');
    const bonesRef = useRef<Bone[]>();
    const bonesRestPos = useRef<{x: number, y: number, z: number}[]>();
    const bonesRestRot = useRef<{x: number, y: number, z: number}[]>();
    const bonesMaxMinCoords = useRef<{ max: number; min: number}>();

    useEffect(() => {
        scene.matrixAutoUpdate = true;
        scene.matrixWorldNeedsUpdate = true;
        gltf.scene.traverse((node) => {
            if ((node as SkinnedMesh)?.isSkinnedMesh) {
                const skinnedMesh = node as SkinnedMesh;
                skinnedMesh.normalizeSkinWeights();
                skinnedMesh.geometry.normalizeNormals();
                skinnedMesh.matrixWorldNeedsUpdate = true;
                skinnedMesh.matrixAutoUpdate = true;
            }
        })
        const skeletonHelper = new SkeletonHelper(gltf.scene);
        const bones = skeletonHelper.bones;
        bonesRef.current = bones;
        const bonePos = bones.map((bone) => ({x: +bone.position.x, y: +bone.position.y, z: +bone.position.z}));
        const boneRot = bones.map((bone) => ({x: +bone.rotation.x, y: +bone.rotation.y, z: +bone.rotation.z}));
        const sortedCoords = Array.from(bonePos).sort((a, b) => a.y - b.y)
        const maxMinBonePos = {max: sortedCoords[sortedCoords.length-1].y, min: sortedCoords[0].y}
        bonesMaxMinCoords.current = maxMinBonePos;
        // scene.add(skeletonHelper)
        bonesRestPos.current = bonePos;
        bonesRestRot.current = boneRot;
        console.log('rerender')
    }, [scene, gltf])

    useFrame(() => {
        const bones = bonesRef.current;
        const bonesPos = bonesRestPos.current;
        const bonesRot = bonesRestRot.current;
        const maxMinCoords = bonesMaxMinCoords.current;

        if (bones && bonesPos && maxMinCoords && bonesRot) {
            bones.forEach((bone, i) => {
                const bonePosFactor = adjust(bone.getWorldPosition(new Vector3()).y, maxMinCoords.min, maxMinCoords.max, 0, 1) + 2.5;
                const displacementFactor = bonePosFactor / 100;
                const currentBoneRot = bonesRot[i];
                const time = clock.elapsedTime / 10;
                const noiseScale = 1;
                const noiseVal = noise(
                    ((currentBoneRot.x * noiseScale + time)), 
                    ((currentBoneRot.y * noiseScale + time)), 
                    ((currentBoneRot.z * noiseScale + time)), 
                    time) * displacementFactor;

                const newRotation = {
                    x: currentBoneRot.x + noiseVal, 
                    y: currentBoneRot.y + noiseVal, 
                    z: currentBoneRot.z +  noiseVal
                };
                bone.rotation.set(newRotation.x, newRotation.y, newRotation.z)
                bone.position.set(bonesPos[i].x, bonesPos[i].y, bonesPos[i].z)
                bone.matrixWorldNeedsUpdate = true;
                bone.updateMatrix();
                bone.updateMatrixWorld();
            })
        }
    })


    return (
        <>
            <primitive object={gltf.scene} />
            <pointLight intensity={8} position={[1, 6, 5]} />
            <pointLight ref={el => el ? lightRef.current = el : null} intensity={4} position={[0, 4, 2.5]} />
            <ambientLight intensity={1} />
            <OrbitControls />
        </>
    )
}