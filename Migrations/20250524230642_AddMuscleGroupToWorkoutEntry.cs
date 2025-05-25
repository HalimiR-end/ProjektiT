using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddMuscleGroupToWorkoutEntry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MuscleGroup",
                table: "WorkoutEntries",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MuscleGroup",
                table: "WorkoutEntries");
        }
    }
}
