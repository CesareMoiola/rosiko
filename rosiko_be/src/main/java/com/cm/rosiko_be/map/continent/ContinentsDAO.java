package com.cm.rosiko_be.map.continent;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class ContinentsDAO {

    public static List<Continent> getContinents(){
        List<Continent> continents = null;
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            File continentsFile = new File("src/main/resources/continents.json");
            continents = objectMapper.readValue(continentsFile, new TypeReference<List<Continent>>(){});
        } catch (IOException e) {
            e.printStackTrace();
        }

        return continents;
    }
}
