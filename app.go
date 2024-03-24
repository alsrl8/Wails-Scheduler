package main

import (
	"changeme/schedule"
	"context"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetString() string {
	return "Hello world!"
}

func (a *App) GetSchedules() []schedule.Schedule {
	return []schedule.Schedule{
		{
			Id:   "id1",
			Name: "S1",
			Desc: "D1",
		},
		{
			Id:   "id2",
			Name: "S2",
			Desc: "D2",
		},
		{
			Id:   "id3",
			Name: "Something Name",
			Desc: "Some Desc",
		},
	}
}
