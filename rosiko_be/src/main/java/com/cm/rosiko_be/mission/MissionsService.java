package com.cm.rosiko_be.mission;

import com.cm.rosiko_be.enums.Color;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MissionsService {

    public List<Mission> getMissions(){

        int id = 0;

        List<Mission> missions = new ArrayList<>();

        missions.add(new Mission01(id));
        id++;

        missions.add(new Mission02(id));
        id++;

        missions.add(new Mission03(id));
        id++;

        missions.add(new Mission04(id));
        id++;

        missions.add(new Mission05(id));
        id++;

        missions.add(new Mission06(id));
        id++;

        missions.add(new Mission07(id));
        id++;

        for (Color color : Color.values()){
            missions.add(new MissionColor(id, color));
            id++;
        }

        return missions;
    }
}
