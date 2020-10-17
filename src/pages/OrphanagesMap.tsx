import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import api from '../services/api';
import mapIcon from '../utils/mapIcon'
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanage-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="marker"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Perdões</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map 
        center={[-21.0922534,-45.0921027]} 
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {orphanages.map(orphanage => {
        return (          
          <Marker 
          position={[orphanage.latitude, orphanage.longitude]}
          icon={mapIcon}
          key={orphanage.id}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            {orphanage.name}
            <Link to={`/orphanage/${orphanage.id}`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
        )
        })}

      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>

    </div>
  )
}

export default OrphanagesMap;