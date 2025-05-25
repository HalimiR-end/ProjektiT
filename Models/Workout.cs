namespace FitnessTrackerAPI.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
 public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime Date { get; set; }
        public int UserId { get; set; } // 💥 kjo duhet të ekzistojë
        public List<WorkoutEntry> Entries { get; set; } = new();
    }

