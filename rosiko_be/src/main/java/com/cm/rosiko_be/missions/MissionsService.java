package com.cm.rosiko_be.missions;

import com.cm.rosiko_be.enums.Color;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MissionsService {

    public List<Mission> getMissions(){
        List<Mission> missions = new ArrayList<>();
        missions.add(new Mission01());
        missions.add(new Mission02());
        missions.add(new Mission03());
        missions.add(new Mission04());
        missions.add(new Mission05());
        missions.add(new Mission06());
        missions.add(new Mission07());

        for (Color color : Color.values()){
            missions.add(new MissionColor(color));
        }

        return missions;
    }
}
