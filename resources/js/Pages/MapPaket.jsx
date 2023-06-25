import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../css/app.css";

const MapPaket = ({ shipment }) => {
    const markerIcon = (color) =>
        new L.Icon({
            iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
        });

    const latitudeRegex = /@(-?\d+\.?\d*),/;
    const longitudeRegex = /,(-?\d+\.?\d*)/;

    const linkMaps = shipment.link_maps;
    const latitudeMatch = linkMaps ? linkMaps.match(latitudeRegex) : null;
    const longitudeMatch = linkMaps ? linkMaps.match(longitudeRegex) : null;

    const center =
        latitudeMatch && longitudeMatch
            ? [parseFloat(latitudeMatch[1]), parseFloat(longitudeMatch[1])]
            : null;
    return (
        <>
            {center && (
                <div className="pt-3 pl-6 pr-6 pb-6">
                    <MapContainer
                        center={center}
                        zoom={14}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={center} icon={markerIcon("blue")}>
                            <Popup>
                                <p>Pickup Point</p>
                            </Popup>
                        </Marker>
                        {shipment.destinations.map((item, i) => {
                            const destinationLinkMaps = item.link_maps;
                            const destinationLatitudeMatch = destinationLinkMaps
                                ? destinationLinkMaps.match(latitudeRegex)
                                : null;
                            const destinationLongitudeMatch =
                                destinationLinkMaps
                                    ? destinationLinkMaps.match(longitudeRegex)
                                    : null;
                            const destinationCoordinates =
                                destinationLatitudeMatch &&
                                destinationLongitudeMatch
                                    ? [
                                          parseFloat(
                                              destinationLatitudeMatch[1]
                                          ),
                                          parseFloat(
                                              destinationLongitudeMatch[1]
                                          ),
                                      ]
                                    : null;
                            return (
                                <>
                                    {destinationCoordinates && (
                                        <Marker
                                            key={i}
                                            position={destinationCoordinates}
                                            icon={
                                                item.status === "Sudah Dikirim"
                                                    ? markerIcon("green")
                                                    : item.status ===
                                                      "Sedang Dikirim"
                                                    ? markerIcon("orange")
                                                    : markerIcon("red")
                                            }
                                        >
                                            <Popup>
                                                <p>
                                                    Nama Penerima :{" "}
                                                    {item.nama_penerima}
                                                </p>
                                                <p>Alamat : {item.alamat}</p>
                                                <p>Status : {item.status}</p>
                                                {item.status ===
                                                    "Sudah Dikirim" &&
                                                    item.photo !== null && (
                                                        <img
                                                            src={`../uploads/${item.photo}`}
                                                            alt=""
                                                        />
                                                    )}
                                            </Popup>
                                        </Marker>
                                    )}
                                </>
                            );
                        })}
                    </MapContainer>
                </div>
            )}
        </>
    );
};

export default MapPaket;
