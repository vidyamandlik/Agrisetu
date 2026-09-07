-- AgriSetu core schema

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('farmer','buyer','admin')),
  village TEXT,
  district TEXT,
  language_pref TEXT DEFAULT 'mr',
  kyc_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS listings (

  id SERIAL PRIMARY KEY,

  farmer_id INT REFERENCES users(id),

  crop TEXT NOT NULL,

  quantity NUMERIC,

  unit TEXT DEFAULT 'kg',

  quality_grade TEXT,

  photo_url TEXT,

  location TEXT,

  expected_price NUMERIC,

  status TEXT DEFAULT 'open',

  created_at TIMESTAMP DEFAULT now()

);

CREATE TABLE IF NOT EXISTS prices (
  id SERIAL PRIMARY KEY,
  crop TEXT NOT NULL,
  market_name TEXT,
  district TEXT,
  price_min NUMERIC,
  price_max NUMERIC,
  price_modal NUMERIC,
  date DATE DEFAULT CURRENT_DATE,
  source TEXT
);

CREATE TABLE IF NOT EXISTS offers (
  id SERIAL PRIMARY KEY,
  listing_id INT REFERENCES listings(id),
  buyer_id INT REFERENCES users(id),
  offer_price NUMERIC,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  offer_id INT REFERENCES offers(id),
  status TEXT DEFAULT 'confirmed',
  payment_reference TEXT,
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fpo_groups (
  id SERIAL PRIMARY KEY,
  name TEXT,
  member_farmer_ids INT[],
  aggregated_listing_id INT REFERENCES listings(id)
);
