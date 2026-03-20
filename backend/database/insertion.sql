INSERT INTO categories (name, description) VALUES 
('Raquettes', 'Raquettes de tennis pour tous les niveaux.'),
('Vêtements', 'Vêtements de tennis pour hommes et femmes.'),
('Chaussures', 'Chaussures de tennis confortables et performantes.'),
('Accessoires', 'Accessoires de tennis'),
('Sacs', 'Sacs de tennis pour transporter votre équipement.');

INSERT INTO brands (name) VALUES 
('Wilson'),
('Babolat'),
('Lacoste'),
('Nike'),
('Adidas');

INSERT INTO products (name, description, price, category_id, brand_id, gender) VALUES

('Raquette de Tennis Shift 99 Pro V1','Cette raquette révolutionnaire intègre des technologies modernes pour créer des effets importants avec un confort inégalé.',199.99,1,1,'unisex'),

('Raquette de Tennis Pro Staff X v14','Idéale pour les joueurs qui apprécient les sensations classiques des raquettes Pro Staff mais qui recherchent une raquette plus tolérante et facile à manier.',229.99,1,1,'unisex'),

('Chaussures Nike Vapor Pro 3','Chaussure de tennis surface dure pour hommes',129.99,3,4,'homme'),

('Hoodie Nike Court Heritage','Hoodie de tennis confortable pour hommes',100.00,2,4,'homme'),

('Short Nike Court Victory',"Prêt pour l'entraînement, prêt pour le jeu : ce short respirant vous garde au sec sur et en dehors du court.",59.99,2,4,'homme'),

('Sac Nike Gym Club retro Off-White','Sac de voyage Old School idéal pour les entrainements',45.00,5,4,'unisex'),

('Gold Academy x3','Balles de tennis',6.99,4,2,'unisex'),

('Survêtement Lacoste Tennis x Daniil Medvedev','Survêtement officiel',260.00,2,3,'homme'),

('Chaussure de tennis Adizero Ubersonic','Chaussure de tennis Adidas haute performance',135.00,3,5,'homme'),

('Short de tennis Climacool Club','Short respirant Adidas Climacool',35.00,2,5,'homme'),

('Chaussure de tennis Gamecourt 2','Chaussure Adidas Gamecourt confortable',95.00,3,5,'homme'),

('Sac Wilson Super Tour Pro Staff 9R','Le sac de tennis Wilson Super Tour Pro Staff permet de transporter jusque 9 raquettes.',89.99,5,1,'unisex'),

('Short Tennis Ultra Dry stretch Lacoste',"Ce short offre liberté de mouvement et maintien au sec pendant l'effort grâce à son tissu stretch.",90.00,2,3,'homme'),

('Béret en Petit Piqué crocodile brodé Lacoste','Béret en coton avec crocodile brodé.',80.00,4,3,'unisex'),

('Raquette Evo Drive Gen2 Cordée',"Raquette conçue pour puissance et confort.",179.95,1,2,'unisex'),

('Chaussures SFX 4 Clay Women','Chaussures confortables avec bon maintien.',120.00,3,2,'femme'),

('Pantalon de tennis Walk On Adidas',"Pantalon léger et respirant.",75.00,2,5,'homme'),

('Chaussettes mi-mollet de tennis Adidas','Chaussettes rembourrées haute performance.',18.00,4,5,'unisex'),

('Serre-poignets de tennis Nike Premier','Absorbe la transpiration.',14.99,4,4,'unisex'),

('Pantalon Nike Advantage femme',"Pantalon tennis femme confortable.",74.99,2,4,'femme');

INSERT INTO sizes (label) VALUES 
('S'),
('M'),
('L'),
('XL'),
('27'),
('28'),
('29'),
('30'),
('31'),
('32'),
('33'),
('34'),
('35'),
('36'),
('37'),
('38'),
('39'),
('40'),
('41'),
('42'),
('43'),
('44'),
('45');

INSERT INTO colors (name) VALUES 
('Rouge'),
('Bleu'),
('Noir'),
('Blanc');

-- VÊTEMENTS
INSERT INTO product_variants (product_id, size_id, color_id, stock)
SELECT p.id, s.id, c.id, 10
FROM products p
JOIN sizes s ON s.label IN ('S','M','L','XL')
JOIN colors c
WHERE p.category_id = 2;

-- CHAUSSURES (FIX)
INSERT INTO product_variants (product_id, size_id, color_id, stock)
SELECT p.id, s.id, c.id, 10
FROM products p
JOIN sizes s ON s.label IN ('36','37','38','39','40','41','42','43','44','45')
JOIN colors c
WHERE p.category_id = 3;

-- AUTRES
INSERT INTO product_variants (product_id, size_id, color_id, stock)
SELECT p.id, NULL, c.id, 10
FROM products p
JOIN colors c
WHERE p.category_id IN (1,4,5);