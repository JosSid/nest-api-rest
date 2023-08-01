import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1690913587826 implements MigrationInterface {
  name = 'Init1690913587826';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_projects _access_level_enum" AS ENUM('40', '50')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_projects " ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" "public"."users_projects _access_level_enum" NOT NULL, "user_id" uuid, "project_id" uuid, CONSTRAINT "PK_11e7699ad04207bdcc621f7983d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users _role_enum" AS ENUM('BASIC', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users " ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users _role_enum" NOT NULL, CONSTRAINT "UQ_0fb77e465edebc92c4aa86c548a" UNIQUE ("email"), CONSTRAINT "UQ_c1aa4cc61a168351eb15dad4ec8" UNIQUE ("username"), CONSTRAINT "PK_4ab1c54e07add7286bfd0c510c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_projects " ADD CONSTRAINT "FK_808bc6dfb2efacb50fcea2e82b5" FOREIGN KEY ("user_id") REFERENCES "users "("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_projects " ADD CONSTRAINT "FK_717064ebcf3268c5795082e9bdf" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_projects " DROP CONSTRAINT "FK_717064ebcf3268c5795082e9bdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_projects " DROP CONSTRAINT "FK_808bc6dfb2efacb50fcea2e82b5"`,
    );
    await queryRunner.query(`DROP TABLE "users "`);
    await queryRunner.query(`DROP TYPE "public"."users _role_enum"`);
    await queryRunner.query(`DROP TABLE "users_projects "`);
    await queryRunner.query(
      `DROP TYPE "public"."users_projects _access_level_enum"`,
    );
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
