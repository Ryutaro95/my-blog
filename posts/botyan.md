---
title: テスト記事
date: 2023-08-18
---


親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）


cssのコードブロックを確認
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import './prism.css';
@import 'tailwindcss/utilities';

@layer base {
  body {
    @apply text-zinc-600 dark:text-zinc-400;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply text-zinc-900 dark:text-zinc-200;
  }

  hr {
    @apply border-zinc-100 dark:border-zinc-700/25;
  }
}

```

Go言語のコードブロックを確認
```go
package usecase

import (
	"fmt"
	"log"
	"time"
	"todo/model"
)

// 受け取ったデータを保存・参照するために infra の処理をRepository経由で呼ぶ
// usecaseはmodelに依存しても良い

type TaskUsecase interface {
	Create(title, description, priority string) string
	FetchTasks(status, priority string) []string
	Update(targetTitle, updatetitle, description, priority string) (string, error)
	Completed(title string) (string, error)
}

type taskUsecase struct {
	tr model.TaskRepository
}

func NewTaskUsecase(tr model.TaskRepository) TaskUsecase {
	return &taskUsecase{tr: tr}
}

func (tu *taskUsecase) Create(title, description, priority string) string {
	tasks := tu.tr.FetchTasks()
	task := model.NewTask(title, description, getPriority(priority))
	tasks = append(tasks, *task)
	tu.tr.Create(tasks)

	return fmt.Sprintf("タスク「%s」を追加しました。", title)
}

func (tu *taskUsecase) FetchTasks(status, priority string) []string {
	tasks := tu.tr.FetchTasks()
	if status != "" {
		tasks = tu.filterByCompleteStatus(tasks, status)
	}
	if priority != "" {
		tasks = tu.filterByPriority(tasks, priority)
	}
	var response []string
	for i, task := range tasks {
		status := "未完了"
		if task.IsDone {
			status = "完了"
		}
		response = append(response, fmt.Sprintf("%d. %s: %s (%s) 優先度: %s\n", i+1, task.Title, task.Description, status, priorityToString(task.Priority)))
	}
	return response
}

func (tu *taskUsecase) Update(targetTitle, UpdateTitle, description, priority string) (string, error) {
	tasks := tu.tr.FetchTasks()
	for i, task := range tasks {
		if task.Title == targetTitle {
			if UpdateTitle != "" {
				tasks[i].Title = UpdateTitle
			}
			if description != "" {
				tasks[i].Description = description
			}
			if priority != "" {
				tasks[i].Priority = getPriority(priority)
			}
			tasks[i].UpdatedAt = time.Now().UTC()
			if err := tu.tr.Update(tasks); err != nil {
				return "", err
			}

			return fmt.Sprintf("タスク「%s」を更新しました。\n", targetTitle), nil
		}
	}
	return fmt.Sprintf("タスク「%s」が見つかりませんでした。\n", targetTitle), nil
}

func (tu *taskUsecase) Completed(title string) (string, error) {
	tasks := tu.tr.FetchTasks()
	for i, task := range tasks {
		if task.Title == title {
			tasks[i].IsDone = true
			// tr.Create(tasks)
			if err := tu.tr.Completed(tasks); err != nil {
				return "", err
			}
			return fmt.Sprintf("タスク「%s」を完了しました。\n", title), nil
		}
	}
	return fmt.Sprintf("タスク「%s」が見つかりませんでした。\n", title), nil
}


// 条件に一致したタスクのスライスを返す
func (tu *taskUsecase) filterByCompleteStatus(tasks []model.Task, status string) []model.Task {
	var filteredTasks []model.Task
	for _, task := range tasks {
		if status == "done" {
			if task.IsDone {
				filteredTasks = append(filteredTasks, task)
			}
		} else if status == "notdone" {
			if !task.IsDone {
				filteredTasks = append(filteredTasks, task)
			}
		} else {
			log.Fatal("条件が見つかりませんでした。「done」または「notdone」を入力してください")
			break
		}
	}
	return filteredTasks
}

func (t *taskUsecase) filterByPriority(tasks []model.Task, priority string) []model.Task {
	var filteredTasks []model.Task
	pri := getPriority(priority)
	for _, task := range tasks {
		switch {
		case task.Priority == model.None && task.Priority == pri:
			filteredTasks = append(filteredTasks, task)
		case task.Priority == model.Low && task.Priority == pri:
			filteredTasks = append(filteredTasks, task)
		case task.Priority == model.Normal && task.Priority == pri:
			filteredTasks = append(filteredTasks, task)
		case task.Priority == model.High && task.Priority == pri:
			filteredTasks = append(filteredTasks, task)
		}
	}
	return filteredTasks
}

func getPriority(priority string) model.Priority {
	var reternPriority model.Priority
	if priority == "" {
		reternPriority = model.None
	}
	switch priority {
	case "low":
		reternPriority = model.Low
	case "normal":
		reternPriority = model.Normal
	case "high":
		reternPriority = model.High
	default:
		return model.None
	}

	return reternPriority
}

func priorityToString(priority model.Priority) string {
	switch priority {
	case model.None:
		return "なし"
	case model.Low:
		return "低"
	case model.Normal:
		return "中"
	case model.High:
		return "高"

	}
	return "なし"
}
```

ファイル名は認識される？
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello world!")
}
```