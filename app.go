package main

import (
	"changeme/app"
	"changeme/model"
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

func (a *App) GetSchedules() []model.Schedule {
	schedulePointers := app.GetSchedules()

	schedules := make([]model.Schedule, 0, len(schedulePointers))
	for _, schedulePtr := range schedulePointers {
		if schedulePtr == nil {
			continue
		}
		schedules = append(schedules, *schedulePtr)
	}
	return schedules
}

func (a *App) AddSchedule(schedule model.Schedule) {
	app.AddSchedule(schedule)
}

func (a *App) DeleteSchedule(scheduleId string) {
	app.DeleteSchedule(scheduleId)
}
