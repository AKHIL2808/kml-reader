
import { MapContainer, TileLayer, Polygon, Circle } from 'react-leaflet';

export default function Details({ textXml }) {
  if (!textXml) return <div>Upload File</div>;

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(textXml, "text/xml");

  const points = Array.from(xmlDoc.getElementsByTagName("Point")).map((point) => {
    const coordinates = point.getElementsByTagName("coordinates")[0].textContent.trim();
    const [lng, lat] = coordinates.split(',').map(Number);
    return [lat, lng];
  });

  const polygons = Array.from(xmlDoc.getElementsByTagName("Polygon")).map((polygon) => {
    const linearRing = polygon.getElementsByTagName("LinearRing")[0];
    // console.log(linearRing)
    const coordinates = linearRing.getElementsByTagName("coordinates")[0].textContent.trim();
    // console.log(coordinates)
    return coordinates.split(/\s+/).map((coord) => {
      console.log("coord ", coord)
      const [lng, lat] = coord.split(',').map(Number);
      console.log(lng, lat)
      return [lat, lng];
    });
  });
  const purpleOptions = { color: 'purple' }
  const fillBlueOptions = { fillColor: 'blue' }

  console.log(polygons)
  return (
    <div className="h-screen m-4 border border-gray-300 rounded-md overflow-hidden">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://maps.google.com">Google Maps</a>'
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />

        {points.map((point, index) => (
          <Circle key={index} center={point} pathOptions={fillBlueOptions} radius={200} />
        ))}

        {polygons.map((polygon, index) => (
          <Polygon
            key={`polygon-${index}`}
            pathOptions={purpleOptions}
            positions={polygon}
          />
        ))}
      </MapContainer>
    </div>
  );
}
