'use client'

import { adjust } from '@/lib/utils';
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { SkeletonHelper, Object3D, Object3DEventMap, SkinnedMesh, Bone, Vector3, Mesh, Material, Shader } from "three"
import { createNoise4D } from "simplex-noise";
import Plant from "./Plant-2-bake-bones"

export default function HomepageScene() {
    const lightRef = useRef<Object3D<Object3DEventMap>>() as MutableRefObject<Object3D<Object3DEventMap>>;
    const noise = createNoise4D();
    const { scene, clock } = useThree();
    const gltf = useGLTF('/Plant-2-bake-bones.gltf');
    const bonesRef = useRef<Bone[]>();
    const bonesRestPos = useRef<{ x: number, y: number, z: number }[]>();
    const bonesRestRot = useRef<{ x: number, y: number, z: number }[]>();
    const bonesMaxMinCoords = useRef<{ max: number; min: number }>();
    const materials = useRef<Material[]>([])

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
                const material = skinnedMesh.material as Material;
                const uTime = Date.now();
                const onBeforeCompile = (shader: Shader) => {
                    shader.uniforms.uTime = { value: uTime };
                    shader.vertexShader = 'uniform float uTime;' + shader.vertexShader;
                    const shaderWithFunctions = shader.vertexShader.replace(
                        `#define STANDARD`,
                        `
                        #define STANDARD
                        float hash( vec2 p ) {
                            float h = dot(p,vec2(127.1,311.7));	
                              return fract(sin(h)*43758.5453123);
                          }
                        
                        float noise( in vec2 p ) {
                            vec2 i = floor( p );
                            vec2 f = fract( p );	
                              vec2 u = f*f*(3.0-2.0*f);
                            return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ), 
                                             hash( i + vec2(1.0,0.0) ), u.x),
                                        mix( hash( i + vec2(0.0,1.0) ), 
                                             hash( i + vec2(1.0,1.0) ), u.x), u.y);
                          }
                          `);

                    const shaderDisplacement = shaderWithFunctions.replace(
                        '#include <begin_vertex>',
                        `
                        float myNoiseDisplacement =  noise(position.xy * 2. + uTime / 10.) / 20.;
                        vec3 transformed = vec3( position.x, position.y + myNoiseDisplacement, position.z );

                        #ifdef USE_ALPHAHASH

                            vPosition = vec3( position );

                        #endif
`                    )
                    shader.vertexShader = shaderDisplacement;
                    shader.fragmentShader = shader.fragmentShader.replace(
                        'vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;',
                        'vec3 totalDiffuse = (reflectedLight.directDiffuse + reflectedLight.indirectDiffuse - .09) * vec3(.65, 1.5, .65);'
                    );
                    // console.log(shader.vertexShader)
                    material.userData.shader = shader;
                }
                material.onBeforeCompile = onBeforeCompile;
                material.needsUpdate = true;
                materials.current.push(material);
                console.log(skinnedMesh)
            }
        })
        const skeletonHelper = new SkeletonHelper(gltf.scene);
        const bones = skeletonHelper.bones;
        bonesRef.current = bones;
        const bonePos = bones.map((bone) => ({ x: +bone.position.x, y: +bone.position.y, z: +bone.position.z }));
        const boneRot = bones.map((bone) => ({ x: +bone.rotation.x, y: +bone.rotation.y, z: +bone.rotation.z }));
        const sortedCoords = Array.from(bonePos).sort((a, b) => a.y - b.y)
        const maxMinBonePos = { max: sortedCoords[sortedCoords.length - 1].y, min: sortedCoords[0].y }
        bonesMaxMinCoords.current = maxMinBonePos;
        // scene.add(skeletonHelper)
        bonesRestPos.current = bonePos;
        bonesRestRot.current = boneRot;
        console.log('rerender')
    }, [scene, gltf])

    console.log(materials);

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
                    z: currentBoneRot.z + noiseVal
                };
                bone.rotation.set(newRotation.x, newRotation.y, newRotation.z)
                bone.matrixWorldNeedsUpdate = true;
                bone.updateMatrix();
                bone.updateMatrixWorld();
            })
        }

        if (materials.current) {
            materials.current.forEach((material) => {
                const uTime = material.userData.shader?.uniforms?.uTime;
                if (uTime) {
                    uTime.value = performance.now() / 1000
                }
                // material.userData.uTime.value = Date.now();
                // // console.log(material.userData);
                // material.needsUpdate = true;
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