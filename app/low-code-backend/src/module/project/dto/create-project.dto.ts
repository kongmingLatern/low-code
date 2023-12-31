export class CreateProjectDto {
  project_id: string;

  project_name: string;

  project_description: string;

  project_status: '已完成' | '进行中' | '未开始';

  project_code: string;

  create_time?: Date;

  update_time?: Date;

  createBy?: string;
}
