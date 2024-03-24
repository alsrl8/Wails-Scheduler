package mongodb

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"sync"
	"time"
)

var clientInstance *mongo.Client
var once sync.Once

func getMongoCloudUri() string {
	return os.Getenv("X_MONGO_WAILS_SCHEDULE_URI")
}

func GetClient() *mongo.Client {
	once.Do(func() {
		uri := getMongoCloudUri()
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
		if err != nil {
			log.Fatal(err)
		}

		if err = client.Ping(ctx, nil); err != nil {
			log.Fatal(err)
		}

		clientInstance = client
	})
	return clientInstance
}
