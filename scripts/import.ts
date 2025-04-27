// used npx tsx scripts/import.ts
// make sure local ts-node is installed, not global

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const addresses = [
  "8421 Greenwood Ave",
  "6049 Seaview Ave",
  "1800 N 45th St",
  "1498 Queen Anne Ave N",
  "501 Olive Way",
  "1529 3rd Ave",
  "1520 Pike Place",
  "100 Pike St",
  "1000 2nd Ave",
  "1398 3rd Ave",
  "898 3rd Ave",
  "200 Columbia St",
  "298 James St",
  "201 Occidental Ave",
  "201 S Main St",
  "398 Occidental Ave S",
  "398 12th Ave S",
  "1398 E Madison St",
  "201 Broadway E",
  "2510 15th Ave S",
  "4400 Rainier Ave S",
  "3798 S Edmunds St",
  "3800 S Ferdinand St",
  "3798 S Hudson St",
  "5098 Rainier Ave S",
  "4598 California Ave SW",
  "6501 California Ave SW",
];

const suffix = "Seattle, WA";

for (let address of addresses) {
  // if (address !== "501 Olive Way") continue;
  let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${address} ${suffix}`)}&format=json&polygon=1&addressdetails=1`);
  if (!response.ok) {
    throw new Error("api request failed");
  }
  let json = await response.json();
  // console.log(json);
  let lat = json[0].lat;
  let lon = json[0].lon;
  console.log(address, lat, lon);
  const {data, error} = await supabase.from("markers").insert({
    title: address,
    latitude: lat,
    longitude: lon,
  });
  if (error !== null) throw Error("supabase failed");
}
