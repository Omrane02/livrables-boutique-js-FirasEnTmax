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
('Gold Academy x3','Balles de tennis' ,6.99,4,2,'unisex'),
('Survêtement ,Lacoste Tennis x Daniil Medvedev '260,00,2,3,'Homme'),
('Chaussure de tennis Adizero Ubersonic '135,3,5,'Homme'),
('Short de tennis Climacool Club '35,2,3'Homme'),
('CHAUSSURE DE TENNIS GAMECOURT 2'95,3,5'Homme'),
('Sac Wilson Super Tour Pro Staff 9R','Le sac de tennis Wilson Super Tour Pro Staff permet de transporter jusque 9 raquettes.',89.99,5,1,'unisex'),
('Short Tennis Ultra Dry stretch Lacoste',"Ce short offre liberté de mouvement et maintien au sec pendant l'effort grâce à son tissu stretch, une taille ajourée et la technologie Ultra Dry.",90.00,2,3,'homme'),
('Béret en Petit Piqué crocodile brodé Lacoste',' Conçu en petit piqué de coton iconique, il est souligné par un petit crocodile vert brodé sur le côté et des finitions soignées.',80.00,4,3,'unisex'),
('Raquette Evo Drive Gen2 Cordée',"Ce modèle a été conçu pour vous procurer le meilleur confort à la frappe et s'adresse aux joueurs qui veulent développer la puissance de leurs coups en gardant la maîtrise de la trajectoire de balle.",179.95,1,2,'unisex'),
('Chaussures SFX 4 Clay Women','Avec son fit large et l’extension du talon, elle offre un confort particulièrement moelleux tout en assurant de la stabilité sur chaque appui.',120.00,3,2,'femme'),
('Pantalon de tennis Walk On Adidas',"Léger, doux et doté d'une doublure respirante, ce pantalon de tennis adidas t'offre un maximum de style et de confort.",75.00,2,5,'homme'),
('Chaussettes mi-mollet de tennis Adidas','Conçues pour toutes les personnes qui visent la performance, cette paire de chaussettes de tennis mi-mollet rembourrées est parfaite pour s’offrir un confort au top.',18.00,4,5,'unisex'),
('Serre-poignets de tennis Nike Premier','Les serre-poignets de tennis Nike Premier sont fabriqués avec un matériau absorbant extensible pour évacuer la transpiration pendant que vous jouez.',14.99,4,4,'unisex'),
('Pantalon de tennis taille mi-haute Dri-FIT pour femme Nike Advantage',"Prêt pour affronter les micros dans la tente de presse, ce pantalon réinvente les échauffements classiques pour les meilleures joueuses de tennis d'aujourd'hui.",74.99,2,4,'femme');


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

INSERT INTO product_variants (product_id, size_id, color_id, stock, sku)
VALUES
(2, 4, 1, 15, 'NK-COURT-42-NOIR'),
(2, 5, 1, 10, 'NK-COURT-43-NOIR');