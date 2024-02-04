"use client";

import { adjust } from "@/lib/utils";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, Suspense, useEffect, useRef, useState } from "react";
import {
  SkeletonHelper,
  Object3D,
  Object3DEventMap,
  SkinnedMesh,
  Bone,
  Vector3,
  Mesh,
  Material,
  Shader,
  SphereGeometry,
  MeshStandardMaterial,
  DoubleSide,
  MeshPhysicalMaterial,
  BufferAttribute,
  TextureLoader
} from "three";
import { createNoise4D } from "simplex-noise";
import { useProgress } from "@react-three/drei";
import {
  backgroundFragmentShader,
  backgroundVertexShader,
} from "@/lib/three/customBackgroundShader";
import {
  flowerFragmentShader,
  flowerVertexShader,
} from "@/lib/three/customFlowerShader";

export const Loader = ({
  setIsLoaded,
}: {
  setIsLoaded: (boolean: boolean) => void;
}) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress >= 100) {
      setIsLoaded(true);
    }
    console.log(progress);
  }, [progress, setIsLoaded]);

  return <></>;
};

export default function HomepageScene() {
  const lightRef = useRef<Object3D<Object3DEventMap>>() as MutableRefObject<
    Object3D<Object3DEventMap>
  >;
  const noise = createNoise4D();
  const { scene, clock } = useThree();
  const gltf = useGLTF("/gltf/plant-2-bake-bones.gltf");
  const [circle, setCircle] = useState<Mesh>();
  const bonesRef = useRef<Bone[]>();
  const bonesRestPos = useRef<{ x: number; y: number; z: number }[]>();
  const bonesRestRot = useRef<{ x: number; y: number; z: number }[]>();
  const bonesMaxMinCoords = useRef<{ max: number; min: number }>();
  const materials = useRef<Material[]>([]);

  useEffect(() => {
    const geo = new SphereGeometry(100, 32, 64);
    const mat = new MeshPhysicalMaterial({
      transmission: 0.2,
    });

    new TextureLoader().load('/bgColorMap.jpg', (tex) => {
      mat.map = tex;
    })

    function customBackground(shader: Shader) {
      console.log(shader);
      shader.fragmentShader = backgroundFragmentShader;
      shader.vertexShader = backgroundVertexShader;
    }
    mat.onBeforeCompile = customBackground;
    const mesh = new Mesh(geo, mat);
    mat.side = DoubleSide;
    setCircle(mesh);
  }, []);

  useEffect(() => {
    scene.matrixAutoUpdate = true;
    scene.matrixWorldNeedsUpdate = true;
    gltf.scene.traverse((node) => {
      if ((node as SkinnedMesh)?.isSkinnedMesh) {
        const skinnedMesh = node as SkinnedMesh;
        skinnedMesh.normalizeSkinWeights();
        skinnedMesh.geometry.normalizeNormals();
        const material = skinnedMesh.material as MeshPhysicalMaterial;
        material.transmission = 0.1;
        material.roughness = 0.9;
        const uTime = Date.now();
        const onBeforeCompile = (shader: Shader) => {
          shader.uniforms.uTime = { value: uTime };
          shader.vertexShader = flowerVertexShader;
          shader.fragmentShader = flowerFragmentShader;
          material.userData.shader = shader;
        };
        material.onBeforeCompile = onBeforeCompile;
        material.needsUpdate = true;
        materials.current.push(material);
      }
    });
    const skeletonHelper = new SkeletonHelper(gltf.scene);
    const bones = skeletonHelper.bones;
    const bonePos = bones.map((bone) => ({
      x: +bone.position.x,
      y: +bone.position.y,
      z: +bone.position.z,
    }));
    const boneRot = bones.map((bone) => ({
      x: +bone.rotation.x,
      y: +bone.rotation.y,
      z: +bone.rotation.z,
    }));
    const sortedCoords = Array.from(bonePos).sort((a, b) => a.y - b.y);
    const maxMinBonePos = {
      max: sortedCoords[sortedCoords.length - 1].y,
      min: sortedCoords[0].y,
    };
    bonesMaxMinCoords.current = maxMinBonePos;
    bonesRef.current = bones;
    bonesRestPos.current = bonePos;
    bonesRestRot.current = boneRot;
    // scene.add(skeletonHelper)
  }, [scene, gltf]);

  useFrame(() => {
    const bones = bonesRef.current;
    const bonesPos = bonesRestPos.current;
    const bonesRot = bonesRestRot.current;
    const maxMinCoords = bonesMaxMinCoords.current;

    if (bones && bonesPos && maxMinCoords && bonesRot) {
      bones.forEach((bone, i) => {
        const bonePosFactor =
          adjust(bone.position.x, maxMinCoords.min, maxMinCoords.max, 0, 3) +
          2.5;
        const displacementFactor = bonePosFactor / 50;
        const currentBoneRot = bonesRot[i];
        const time = clock.elapsedTime / 8;
        const noiseScale = 8;
        const noiseVal =
          noise(
            currentBoneRot.x * noiseScale + time,
            currentBoneRot.y * noiseScale + time,
            currentBoneRot.z * noiseScale + time,
            time
          ) * displacementFactor;

        const newRotation = {
          x: currentBoneRot.x + noiseVal,
          y: currentBoneRot.y + noiseVal,
          z: currentBoneRot.z + noiseVal,
        };
        bone.rotation.set(newRotation.x, newRotation.y, newRotation.z);
        bone.matrixWorldNeedsUpdate = true;
        bone.updateMatrix();
        bone.updateMatrixWorld();
      });
    }

    if (materials.current) {
      materials.current.forEach((material) => {
        const uTime = material.userData.shader?.uniforms?.uTime;
        if (uTime) {
          uTime.value = performance.now() / 1000;
        }
      });
    }
  });

  return (
    <>
      <primitive object={gltf.scene} />
      {circle ? <primitive object={circle} /> : null}
      <pointLight intensity={80} position={[1, 6, 5]} />
      <pointLight
        ref={(el) => (el ? (lightRef.current = el) : null)}
        intensity={4}
        position={[0, 4, 2.5]}
      />
      <ambientLight intensity={1} />
      <OrbitControls maxDistance={20} minDistance={2}/>
    </>
  );
}
