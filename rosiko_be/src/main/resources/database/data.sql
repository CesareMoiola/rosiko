/*Valorizzazione tabella continents*/
INSERT INTO continents VALUES ('europe', 'Europe', 5);
INSERT INTO continents VALUES ('north_america', 'North America', 5);
INSERT INTO continents VALUES ('south_america', 'South America', 2);
INSERT INTO continents VALUES ('asia', 'Asia', 7);
INSERT INTO continents VALUES ('africa', 'Africa', 3);
INSERT INTO continents VALUES ('oceania', 'Oceania', 2);

/*Valorizzazione tabella terrytory*/
INSERT INTO territories VALUES ('eastern_australia', 'Eastern Australia', 'oceania');
INSERT INTO territories VALUES ('indonesia', 'Indonesia', 'oceania');
INSERT INTO territories VALUES ('new_guinea', 'New Guinea', 'oceania');
INSERT INTO territories VALUES ('alaska', 'Alaska', 'north_america');
INSERT INTO territories VALUES ('ontario', 'Ontario', 'north_america');
INSERT INTO territories VALUES ('northwest_territory', 'Northwest Territory', 'north_america');
INSERT INTO territories VALUES ('venezuela', 'Venezuela', 'south_america');
INSERT INTO territories VALUES ('madagascar', 'Madagascar', 'africa');
INSERT INTO territories VALUES ('north_africa', 'North Africa', 'africa');
INSERT INTO territories VALUES ('greenland', 'Greenland', 'north_america');
INSERT INTO territories VALUES ('iceland', 'Iceland', 'europe');
INSERT INTO territories VALUES ('great_britain', 'Great Britain', 'europe');
INSERT INTO territories VALUES ('scandinavia', 'Scandinavia', 'europe');
INSERT INTO territories VALUES ('japan', 'Japan', 'asia');
INSERT INTO territories VALUES ('yakursk', 'Yakursk', 'asia');
INSERT INTO territories VALUES ('kamchatka', 'Kamchatka', 'asia');
INSERT INTO territories VALUES ('siberia', 'Siberia', 'asia');
INSERT INTO territories VALUES ('ural', 'Ural', 'asia');
INSERT INTO territories VALUES ('afghanistan', 'Afghanistan', 'asia');
INSERT INTO territories VALUES ('middle_east', 'Middle East', 'asia');
INSERT INTO territories VALUES ('india', 'India', 'asia');
INSERT INTO territories VALUES ('siam', 'Siam', 'asia');
INSERT INTO territories VALUES ('china', 'China', 'asia');
INSERT INTO territories VALUES ('mongolia', 'Mongolia', 'asia');
INSERT INTO territories VALUES ('irkutsk', 'Irkutsk', 'asia');
INSERT INTO territories VALUES ('ukraine', 'Ukraine', 'europe');
INSERT INTO territories VALUES ('southern_europe', 'Southern Europe', 'europe');
INSERT INTO territories VALUES ('western_europe', 'Western Europe', 'europe');
INSERT INTO territories VALUES ('northern_europe', 'Northern Europe', 'europe');
INSERT INTO territories VALUES ('egypt', 'Egypt', 'africa');
INSERT INTO territories VALUES ('east_africa', 'East Africa', 'africa');
INSERT INTO territories VALUES ('congo', 'Congo', 'africa');
INSERT INTO territories VALUES ('south_africa', 'South Africa', 'africa');
INSERT INTO territories VALUES ('brazil', 'Brazil', 'south_america');
INSERT INTO territories VALUES ('argentina', 'Argentina', 'south_america');
INSERT INTO territories VALUES ('eastern_united_states', 'Eastern United States', 'north_america');
INSERT INTO territories VALUES ('western_united_states', 'Western United States', 'north_america');
INSERT INTO territories VALUES ('quebec', 'Quebec', 'north_america');
INSERT INTO territories VALUES ('central_america', 'Central America', 'north_america');
INSERT INTO territories VALUES ('peru', 'Peru', 'south_america');
INSERT INTO territories VALUES ('western_australia', 'Western Australia', 'oceania');
INSERT INTO territories VALUES ('alberta', 'Alberta', 'north_america');

/*Valorizzazione nazioni confinanti*/
INSERT INTO neighboring VALUE ('eastern_australia', 'new_guinea');
INSERT INTO neighboring VALUE ('eastern_australia', 'western_australia');
INSERT INTO neighboring VALUE ('indonesia', 'siam');
INSERT INTO neighboring VALUE ('indonesia', 'new_guinea');
INSERT INTO neighboring VALUE ('indonesia', 'western_australia');
INSERT INTO neighboring VALUE ('new_guinea', 'indonesia');
INSERT INTO neighboring VALUE ('new_guinea', 'western_australia');
INSERT INTO neighboring VALUE ('new_guinea', 'eastern_australia');
INSERT INTO neighboring VALUE ('alaska', 'northwest_territory');
INSERT INTO neighboring VALUE ('alaska', 'alberta');
INSERT INTO neighboring VALUE ('alaska', 'kamchatka');
INSERT INTO neighboring VALUE ('ontario', 'northwest_territory');
INSERT INTO neighboring VALUE ('ontario', 'quebec');
INSERT INTO neighboring VALUE ('ontario', 'eastern_united_states');
INSERT INTO neighboring VALUE ('ontario', 'western_united_states');
INSERT INTO neighboring VALUE ('ontario', 'alberta');
INSERT INTO neighboring VALUE ('ontario', 'greenland');
INSERT INTO neighboring VALUE ('northwest_territory', 'alaska');
INSERT INTO neighboring VALUE ('northwest_territory', 'alberta');
INSERT INTO neighboring VALUE ('northwest_territory', 'ontario');
INSERT INTO neighboring VALUE ('northwest_territory', 'greenland');
INSERT INTO neighboring VALUE ('venezuela', 'central_america');
INSERT INTO neighboring VALUE ('venezuela', 'peru');
INSERT INTO neighboring VALUE ('venezuela', 'brazil');
INSERT INTO neighboring VALUE ('madagascar', 'east_africa');
INSERT INTO neighboring VALUE ('madagascar', 'south_africa');
INSERT INTO neighboring VALUE ('north_africa', 'brazil');
INSERT INTO neighboring VALUE ('north_africa', 'western_europe');
INSERT INTO neighboring VALUE ('north_africa', 'southern_europe');
INSERT INTO neighboring VALUE ('north_africa', 'egypt');
INSERT INTO neighboring VALUE ('north_africa', 'east_africa');
INSERT INTO neighboring VALUE ('north_africa', 'congo');
INSERT INTO neighboring VALUE ('greenland', 'iceland');
INSERT INTO neighboring VALUE ('greenland', 'quebec');
INSERT INTO neighboring VALUE ('greenland', 'ontario');
INSERT INTO neighboring VALUE ('greenland', 'northwest_territory');
INSERT INTO neighboring VALUE ('iceland', 'greenland');
INSERT INTO neighboring VALUE ('iceland', 'great_britain');
INSERT INTO neighboring VALUE ('iceland', 'scandinavia');
INSERT INTO neighboring VALUE ('great_britain', 'iceland');
INSERT INTO neighboring VALUE ('great_britain', 'scandinavia');
INSERT INTO neighboring VALUE ('great_britain', 'northern_europe');
INSERT INTO neighboring VALUE ('great_britain', 'western_europe');
INSERT INTO neighboring VALUE ('scandinavia', 'ukraine');
INSERT INTO neighboring VALUE ('scandinavia', 'northern_europe');
INSERT INTO neighboring VALUE ('scandinavia', 'great_britain');
INSERT INTO neighboring VALUE ('scandinavia', 'iceland');
INSERT INTO neighboring VALUE ('japan', 'kamchatka');
INSERT INTO neighboring VALUE ('japan', 'mongolia');
INSERT INTO neighboring VALUE ('yakursk', 'kamchatka');
INSERT INTO neighboring VALUE ('yakursk', 'irkutsk');
INSERT INTO neighboring VALUE ('yakursk', 'siberia');
INSERT INTO neighboring VALUE ('kamchatka', 'alaska');
INSERT INTO neighboring VALUE ('kamchatka', 'yakursk');
INSERT INTO neighboring VALUE ('kamchatka', 'irkutsk');
INSERT INTO neighboring VALUE ('kamchatka', 'mongolia');
INSERT INTO neighboring VALUE ('kamchatka', 'japan');
INSERT INTO neighboring VALUE ('siberia', 'ural');
INSERT INTO neighboring VALUE ('siberia', 'china');
INSERT INTO neighboring VALUE ('siberia', 'mongolia');
INSERT INTO neighboring VALUE ('siberia', 'irkutsk');
INSERT INTO neighboring VALUE ('siberia', 'yakursk');
INSERT INTO neighboring VALUE ('ural', 'ukraine');
INSERT INTO neighboring VALUE ('ural', 'afghanistan');
INSERT INTO neighboring VALUE ('ural', 'china');
INSERT INTO neighboring VALUE ('ural', 'siberia');
INSERT INTO neighboring VALUE ('afghanistan', 'ural');
INSERT INTO neighboring VALUE ('afghanistan', 'ukraine');
INSERT INTO neighboring VALUE ('afghanistan', 'middle_east');
INSERT INTO neighboring VALUE ('afghanistan', 'india');
INSERT INTO neighboring VALUE ('afghanistan', 'china');
INSERT INTO neighboring VALUE ('middle_east', 'ukraine');
INSERT INTO neighboring VALUE ('middle_east', 'southern_europe');
INSERT INTO neighboring VALUE ('middle_east', 'egypt');
INSERT INTO neighboring VALUE ('middle_east', 'india');
INSERT INTO neighboring VALUE ('middle_east', 'afghanistan');
INSERT INTO neighboring VALUE ('india', 'afghanistan');
INSERT INTO neighboring VALUE ('india', 'middle_east');
INSERT INTO neighboring VALUE ('india', 'siam');
INSERT INTO neighboring VALUE ('india', 'china');
INSERT INTO neighboring VALUE ('siam', 'china');
INSERT INTO neighboring VALUE ('siam', 'india');
INSERT INTO neighboring VALUE ('siam', 'indonesia');
INSERT INTO neighboring VALUE ('china', 'mongolia');
INSERT INTO neighboring VALUE ('china', 'siberia');
INSERT INTO neighboring VALUE ('china', 'ural');
INSERT INTO neighboring VALUE ('china', 'afghanistan');
INSERT INTO neighboring VALUE ('china', 'india');
INSERT INTO neighboring VALUE ('china', 'siam');
INSERT INTO neighboring VALUE ('mongolia', 'irkutsk');
INSERT INTO neighboring VALUE ('mongolia', 'siberia');
INSERT INTO neighboring VALUE ('mongolia', 'china');
INSERT INTO neighboring VALUE ('mongolia', 'japan');
INSERT INTO neighboring VALUE ('mongolia', 'kamchatka');
INSERT INTO neighboring VALUE ('irkutsk', 'yakursk');
INSERT INTO neighboring VALUE ('irkutsk', 'siberia');
INSERT INTO neighboring VALUE ('irkutsk', 'mongolia');
INSERT INTO neighboring VALUE ('irkutsk', 'kamchatka');
INSERT INTO neighboring VALUE ('ukraine', 'scandinavia');
INSERT INTO neighboring VALUE ('ukraine', 'northern_europe');
INSERT INTO neighboring VALUE ('ukraine', 'southern_europe');
INSERT INTO neighboring VALUE ('ukraine', 'middle_east');
INSERT INTO neighboring VALUE ('ukraine', 'afghanistan');
INSERT INTO neighboring VALUE ('ukraine', 'ural');
INSERT INTO neighboring VALUE ('southern_europe', 'northern_europe');
INSERT INTO neighboring VALUE ('southern_europe', 'western_europe');
INSERT INTO neighboring VALUE ('southern_europe', 'north_africa');
INSERT INTO neighboring VALUE ('southern_europe', 'egypt');
INSERT INTO neighboring VALUE ('southern_europe', 'middle_east');
INSERT INTO neighboring VALUE ('southern_europe', 'ukraine');
INSERT INTO neighboring VALUE ('western_europe', 'great_britain');
INSERT INTO neighboring VALUE ('western_europe', 'north_africa');
INSERT INTO neighboring VALUE ('western_europe', 'southern_europe');
INSERT INTO neighboring VALUE ('western_europe', 'northern_europe');
INSERT INTO neighboring VALUE ('northern_europe', 'scandinavia');
INSERT INTO neighboring VALUE ('northern_europe', 'great_britain');
INSERT INTO neighboring VALUE ('northern_europe', 'western_europe');
INSERT INTO neighboring VALUE ('northern_europe', 'southern_europe');
INSERT INTO neighboring VALUE ('northern_europe', 'ukraine');
INSERT INTO neighboring VALUE ('egypt', 'southern_europe');
INSERT INTO neighboring VALUE ('egypt', 'north_africa');
INSERT INTO neighboring VALUE ('egypt', 'east_africa');
INSERT INTO neighboring VALUE ('egypt', 'middle_east');
INSERT INTO neighboring VALUE ('east_africa', 'egypt');
INSERT INTO neighboring VALUE ('east_africa', 'north_africa');
INSERT INTO neighboring VALUE ('east_africa', 'congo');
INSERT INTO neighboring VALUE ('east_africa', 'south_africa');
INSERT INTO neighboring VALUE ('east_africa', 'madagascar');
INSERT INTO neighboring VALUE ('congo', 'north_africa');
INSERT INTO neighboring VALUE ('congo', 'south_africa');
INSERT INTO neighboring VALUE ('congo', 'east_africa');
INSERT INTO neighboring VALUE ('south_africa', 'congo');
INSERT INTO neighboring VALUE ('south_africa', 'madagascar');
INSERT INTO neighboring VALUE ('south_africa', 'east_africa');
INSERT INTO neighboring VALUE ('brazil', 'venezuela');
INSERT INTO neighboring VALUE ('brazil', 'peru');
INSERT INTO neighboring VALUE ('brazil', 'argentina');
INSERT INTO neighboring VALUE ('brazil', 'north_africa');
INSERT INTO neighboring VALUE ('argentina', 'peru');
INSERT INTO neighboring VALUE ('argentina', 'brazil');
INSERT INTO neighboring VALUE ('eastern_united_states', 'ontario');
INSERT INTO neighboring VALUE ('eastern_united_states', 'western_united_states');
INSERT INTO neighboring VALUE ('eastern_united_states', 'central_america');
INSERT INTO neighboring VALUE ('eastern_united_states', 'quebec');
INSERT INTO neighboring VALUE ('western_united_states', 'alberta');
INSERT INTO neighboring VALUE ('western_united_states', 'ontario');
INSERT INTO neighboring VALUE ('western_united_states', 'eastern_united_states');
INSERT INTO neighboring VALUE ('western_united_states', 'central_america');
INSERT INTO neighboring VALUE ('quebec', 'greenland');
INSERT INTO neighboring VALUE ('quebec', 'eastern_united_states');
INSERT INTO neighboring VALUE ('quebec', 'ontario');
INSERT INTO neighboring VALUE ('central_america', 'western_united_states');
INSERT INTO neighboring VALUE ('central_america', 'eastern_united_states');
INSERT INTO neighboring VALUE ('central_america', 'venezuela');
INSERT INTO neighboring VALUE ('peru', 'venezuela');
INSERT INTO neighboring VALUE ('peru', 'brazil');
INSERT INTO neighboring VALUE ('peru', 'argentina');
INSERT INTO neighboring VALUE ('western_australia', 'indonesia');
INSERT INTO neighboring VALUE ('western_australia', 'new_guinea');
INSERT INTO neighboring VALUE ('western_australia', 'eastern_australia');
INSERT INTO neighboring VALUE ('alberta', 'northwest_territory');
INSERT INTO neighboring VALUE ('alberta', 'ontario');
INSERT INTO neighboring VALUE ('alberta', 'western_united_states');
INSERT INTO neighboring VALUE ('alberta', 'alaska');




