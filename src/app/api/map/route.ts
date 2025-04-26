import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/*
-- SQL query to create a markers table
CREATE TABLE markers (
    id SERIAL PRIMARY KEY,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example insert statements for the current markers
INSERT INTO markers (latitude, longitude, title) VALUES
    (48.8584, 2.2945, 'Eiffel Tower'),
    (43.7230, 10.3966, 'Leaning Tower of Pisa');
*/

export async function GET() {
  const { data } = await supabase
    .from('markers')
    .select();

  const mapData = {
    position: { lat: 47.603889, lng: -122.33 }, // Seattle center position
    zoom: 12,
    mapId: 'DEMO_MAP_ID',
    markers: data?.map(marker => ({
      position: { lat: marker.latitude, lng: marker.longitude },
      title: marker.title
    }))
  };

  return NextResponse.json(mapData);
} 
