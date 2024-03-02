import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExercicisWorkoutTable1708998881662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "exercise_workout",
                columns: [
                    {
                        name: "exercise_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "workout_id",
                        type: "uuid",
                        isNullable: false
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKExercise",
                        referencedTableName: "exercise",
                        referencedColumnNames: ["id"],
                        columnNames: ["exercise_id"],
                    },
                    {
                        name: "FKWorkout",
                        referencedTableName: "workout",
                        referencedColumnNames: ["id"],
                        columnNames: ["workout_id"],
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercise_workout");
    }

}
