package app

import (
	"changeme/model"
	"changeme/mongodb"
	"fmt"
)

func GetSchedules() []*model.Schedule {
	client := mongodb.GetClient()
	schedules, err := mongodb.GetSchedules(client)
	if err != nil {
		return nil
	}

	var ret []*model.Schedule
	for _, schedule := range schedules {
		var s model.Schedule
		s.ID = schedule.ID.Hex()
		s.Name = schedule.Name
		s.Desc = schedule.Desc
		ret = append(ret, &s)
		fmt.Printf("%v\n", s)
	}
	return ret
}
