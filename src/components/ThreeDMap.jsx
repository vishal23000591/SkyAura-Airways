import React, { useEffect, useRef } from "react";
import {
  Ion,
  Viewer,
  Terrain,
  Cartesian3,
  Color,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
  EllipsoidGeodesic,
  ArcType,
  BoundingSphere,
  PolylineGlowMaterialProperty,
  HeightReference
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

function ThreeDMap({ source, destination }) {
  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    viewerInstance.current = new Viewer(viewerRef.current, {
      terrain: Terrain.fromWorldTerrain({
        requestWaterMask: true,
        requestVertexNormals: true
      }),
      shouldAnimate: true,
      timeline: false,
      animation: false,
      baseLayerPicker: false,
      geocoder: false,
      sceneMode: 3 // Enable 3D mode by default
    });

    // Enable lighting effects
    viewerInstance.current.scene.globe.enableLighting = false;

    return () => {
      if (viewerInstance.current && !viewerInstance.current.isDestroyed()) {
        viewerInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;

    viewer.entities.removeAll();

    const isValidCoord = (coord) =>
      coord &&
      typeof coord.lat === "number" &&
      !isNaN(coord.lat) &&
      typeof coord.lon === "number" &&
      !isNaN(coord.lon);

    // Add source marker
    if (isValidCoord(source)) {
      viewer.entities.add({
        name: "Source",
        position: Cartesian3.fromDegrees(source.lon, source.lat, 100),
        point: {
          pixelSize: 20,
          color: Color.GREEN,
          outlineColor: Color.WHITE,
          outlineWidth: 3,
          heightReference: HeightReference.CLAMP_TO_GROUND
        },
        label: {
          text: source.name || "Departure",
          font: "20px sans-serif",
          style: LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 3,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: new Cartesian2(0, -25),
          fillColor: Color.GREEN,
          heightReference: HeightReference.CLAMP_TO_GROUND
        }
      });
    }

    // Add destination marker
    if (isValidCoord(destination)) {
      viewer.entities.add({
        name: "Destination",
        position: Cartesian3.fromDegrees(destination.lon, destination.lat, 100),
        point: {
          pixelSize: 20,
          color: Color.RED,
          outlineColor: Color.WHITE,
          outlineWidth: 3,
          heightReference: HeightReference.CLAMP_TO_GROUND
        },
        label: {
          text: destination.name || "Arrival",
          font: "20px sans-serif",
          style: LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 3,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: new Cartesian2(0, -25),
          fillColor: Color.RED,
          heightReference: HeightReference.CLAMP_TO_GROUND
        }
      });
    }

    // Draw flight path if both points exist
    if (isValidCoord(source) && isValidCoord(destination)) {
      try {
        const start = Cartesian3.fromDegrees(source.lon, source.lat);
        const end = Cartesian3.fromDegrees(destination.lon, destination.lat);

        // Create great circle path
        const geodesic = new EllipsoidGeodesic(
          viewer.scene.globe.ellipsoid.cartesianToCartographic(start),
          viewer.scene.globe.ellipsoid.cartesianToCartographic(end)
        );

        const pointsCount = 100;
        const cruiseAltitude = 35000; // Typical cruising altitude in meters
        const positions = [];

        // Generate points along the great circle with realistic altitude profile
        for (let i = 0; i <= pointsCount; i++) {
          const fraction = i / pointsCount;
          const cartographic = geodesic.interpolateUsingFraction(fraction);

          // Realistic altitude curve (takeoff -> cruise -> landing)
          let altitude;
          if (fraction < 0.2) {
            // Takeoff climb
            altitude = 100 + (fraction / 0.2) * cruiseAltitude * 0.8;
          } else if (fraction > 0.8) {
            // Landing descent
            altitude = 100 + ((1 - fraction) / 0.2) * cruiseAltitude * 0.8;
          } else {
            // Cruise
            altitude = cruiseAltitude * (0.9 + Math.random() * 0.2); // Small random variations
          }

          positions.push(
            Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              altitude
            )
          );
        }

        // Add glowing flight path
        viewer.entities.add({
          name: "Flight Path",
          polyline: {
            positions,
            width: 8,
            material: new PolylineGlowMaterialProperty({
              glowPower: 0.2,
              color: Color.CORNFLOWERBLUE.withAlpha(0.8)
            }),
            arcType: ArcType.NONE,
            clampToGround: false
          }
        });

        // Add dashed projected path on ground
        viewer.entities.add({
          polyline: {
            positions: positions.map(pos => {
              const carto = viewer.scene.globe.ellipsoid.cartesianToCartographic(pos);
              return Cartesian3.fromRadians(carto.longitude, carto.latitude, 0);
            }),
            width: 2,
            material: Color.GRAY.withAlpha(0.5),
            arcType: ArcType.NONE,
            dashPattern: 0x00F0F0F0
          }
        });

        // Fly to show entire route
        viewer.camera.flyToBoundingSphere(BoundingSphere.fromPoints(positions), {
          duration: 3,
          offset: new HeadingPitchRange(0, -0.5, 0)
        });

      } catch (error) {
        console.error("Error drawing flight path:", error);
      }
    }
  }, [source, destination]);

  return (
    <div 
      ref={viewerRef} 
      style={{ 
        width: "100%", 
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }} 
    />
  );
}

export default ThreeDMap;