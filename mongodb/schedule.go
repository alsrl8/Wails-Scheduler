package mongodb

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

type Schedule struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Name     string             `bson:"name"`
	Desc     string             `bson:"desc"`
	PostedAt time.Time          `bson:"postedAt"`
}

func NewScheduleModel(name string, desc string) *Schedule {
	objectID := primitive.NewObjectID()

	return &Schedule{
		ID:       objectID,
		Name:     name,
		Desc:     desc,
		PostedAt: time.Now().UTC(),
	}
}

func PostSchedule(client *mongo.Client, s *Schedule) {
	collection := client.Database("schedule").Collection("data")
	result, err := collection.InsertOne(context.TODO(), *s)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Post result: %v\n", result)
}

func GetSchedules(client *mongo.Client) ([]*Schedule, error) {
	collection := client.Database("schedule").Collection("data")
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find())
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer cur.Close(context.TODO())

	var schedules []*Schedule
	for cur.Next(context.TODO()) {
		var schedule Schedule
		err := cur.Decode(&schedule)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		schedules = append(schedules, &schedule)
	}
	return schedules, nil
}
