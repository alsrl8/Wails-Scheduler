package app

import (
	"changeme/model"
	"changeme/mongodb"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
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

func AddSchedule(schedule *model.Schedule) {
	client := mongodb.GetClient()

	var postSchedule mongodb.Schedule
	postSchedule.ID = primitive.NewObjectID()
	postSchedule.Name = schedule.Name
	postSchedule.Desc = schedule.Desc

	mongodb.PostSchedule(client, &postSchedule)
}

func DeleteSchedule(scheduleId string) {
	client := mongodb.GetClient()
	mongodb.DeleteSchedule(client, scheduleId)
}

func ModifySchedule(schedule *model.Schedule) {
	client := mongodb.GetClient()

	id, err := primitive.ObjectIDFromHex(schedule.ID)
	if err != nil {
		log.Fatal(err)
	}

	postSchedule := mongodb.Schedule{
		ID:   id,
		Name: schedule.Name,
		Desc: schedule.Desc,
	}
	mongodb.UpdateSchedule(client, &postSchedule)
}
