import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const addresses = [
  "8421 Greenwood Ave"
];

const suffix = "Seattle, WA";

for (let address of addresses) {
  let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${address} ${suffix}`)}&format=json&polygon=1&addressdetails=1`);
  if (!response.ok) {
    throw new Error("api request failed");
  }
  let json = await response.json();
  let lat = json[0].lat;
  let lon = json[0].lon;
  console.log(lat, lon);
}
