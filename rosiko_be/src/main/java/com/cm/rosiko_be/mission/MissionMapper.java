package com.cm.rosiko_be.mission;

public class MissionMapper {

    public static MissionDTO toMissionDTO( Mission mission ){
        MissionDTO missionDTO = null;

        if(mission != null){
            missionDTO = new MissionDTO(mission.id, mission.description);
        }

        return missionDTO;
    }
}
