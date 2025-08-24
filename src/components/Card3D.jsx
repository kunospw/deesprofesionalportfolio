// src/components/Card3D.jsx
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useTexture, PresentationControls, ContactShadows } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useMemo, useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

function RoundedCard({ w = 4.5, h = 2.7, r = 0.1 }) {
    const [front, back] = useTexture(["/card-front.png", "/card-back.png"]);
    const groupRef = useRef();

    // Ensure textures use the expected orientation/encoding for display on custom UVs
    // keep flipY true so images are uploaded with the usual WebGL orientation
    front.flipY = true;
    back.flipY = true;
    front.encoding = THREE.sRGBEncoding;
    back.encoding = THREE.sRGBEncoding;

    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const rx = r, ry = r; const x = w / 2, y = h / 2;
        s.moveTo(-x + rx, -y);
        s.lineTo(x - rx, -y); s.quadraticCurveTo(x, -y, x, -y + ry);
        s.lineTo(x, y - ry); s.quadraticCurveTo(x, y, x - rx, y);
        s.lineTo(-x + rx, y); s.quadraticCurveTo(-x, y, -x, y - ry);
        s.lineTo(-x, -y + ry); s.quadraticCurveTo(-x, -y, -x + rx, -y);
        return s;
    }, [w, h, r]);

    const [flipped, setFlipped] = useState(false);
    const [hovered, setHovered] = useState(false);

    const spring = useSpring({
        rotationY: flipped ? Math.PI : 0,
        lift: hovered ? 0.1 : 0,
        config: { tension: 280, friction: 22 }
    });

    // Add floating animation using useFrame for smooth animation
    useFrame((state) => {
        if (groupRef.current) {
            // Create a gentle floating motion similar to the background shapes
            const floatY = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
            groupRef.current.position.y = spring.lift.get() + floatY;
        }
    });

    // Create geometry once and generate proper UVs based on its bounding box so the
    // textures map correctly (fixes stretched/striped appearance).
    const geometry = useMemo(() => {
        const geom = new THREE.ShapeGeometry(shape);
        geom.computeBoundingBox();
        const bbox = geom.boundingBox;
        const min = bbox.min;
        const max = bbox.max;
        const rangeX = max.x - min.x || 1;
        const rangeY = max.y - min.y || 1;

        const pos = geom.attributes.position.array;
        const uv = new Float32Array((pos.length / 3) * 2);
        for (let i = 0, j = 0; i < pos.length; i += 3, j += 2) {
            const x = pos[i];
            const y = pos[i + 1];
            uv[j] = (x - min.x) / rangeX;
            uv[j + 1] = (y - min.y) / rangeY;
        }
        geom.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
        return geom;
    }, [shape]);

    // Use the same geometry for front and back so the back image isn't flipped.
    // If you later want to mirror only the back texture, create a cloned geometry here.
    const backGeometry = geometry;

    return (
        <a.group
            ref={groupRef}
            rotation-y={spring.rotationY}
            onClick={() => setFlipped(v => !v)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Front */}
            <mesh geometry={geometry} position-z={0.001}>
                <meshPhysicalMaterial map={front} clearcoat={0.6} roughness={0.35} metalness={0.05} />
            </mesh>
            {/* Back */}
            <mesh geometry={backGeometry} rotation-y={Math.PI} position-z={-0.001}>
                <meshPhysicalMaterial map={back} clearcoat={0.6} roughness={0.35} metalness={0.05} />
            </mesh>
        </a.group>
    );
}

export default function Card3D() {
    const [parallaxY, setParallaxY] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (containerRef.current) {
                        const scrollY = window.scrollY;
                        const windowHeight = window.innerHeight;
                        const servicesSection = document.getElementById('services');

                        if (servicesSection) {
                            const servicesTop = servicesSection.offsetTop;
                            const containerRect = containerRef.current.getBoundingClientRect();
                            const containerTop = containerRect.top + scrollY;
                            const containerHeight = containerRect.height;

                            // Calculate when card should start following scroll
                            const startFollowPoint = containerTop - windowHeight * 0.2;
                            const stopFollowPoint = servicesTop - containerHeight - 50; // 50px buffer

                            if (scrollY < startFollowPoint) {
                                // Card hasn't reached trigger point yet
                                setParallaxY(0);
                                setIsSticky(false);
                            } else if (scrollY >= startFollowPoint && scrollY < stopFollowPoint) {
                                // Card is following scroll
                                const parallaxSpeed = 0.4; // Slightly increased for more noticeable effect
                                const adjustedScroll = scrollY - startFollowPoint;
                                setParallaxY(adjustedScroll * parallaxSpeed);
                                setIsSticky(true);
                            } else {
                                // Card has reached services section - stop at max position
                                const maxParallax = (stopFollowPoint - startFollowPoint) * 0.4;
                                setParallaxY(maxParallax);
                                setIsSticky(true);
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Call once to set initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                minHeight: 300,
                maxHeight: 440,
                background: 'transparent',
                transform: `translateY(${parallaxY}px)`,
                transition: isSticky ? 'transform 0.05s ease-out' : 'transform 0.3s ease-out',
                willChange: 'transform'
            }}
        >
            <Canvas
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent', width: '100%', height: '100%' }}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                {/* brighter ambient + hemisphere light to lift shadows */}
                <ambientLight intensity={0.9} />
                <hemisphereLight skyColor={"#ffffff"} groundColor={"#44474a"} intensity={0.35} />
                <directionalLight position={[3, 5, 4]} intensity={1.4} />
                <PresentationControls
                    global
                    rotation={[0, Math.PI / 12, 0]}
                    polar={[-Math.PI / 8, Math.PI / 8]}
                    azimuth={[-Math.PI / 6, Math.PI / 6]}
                    snap
                >
                    <RoundedCard />
                </PresentationControls>
                {/* softer, lighter contact shadow */}
                <ContactShadows opacity={0.22} scale={8} blur={2} far={3} />
            </Canvas>
        </div>
    );
}