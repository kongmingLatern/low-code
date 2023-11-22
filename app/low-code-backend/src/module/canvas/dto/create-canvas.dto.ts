export interface Status {
  FINISH: '已完成';
  DOING: '进行中';
  NOTSTART: '未开始';
}

export class CreateCanvaDto {
  canvas_id: string;

  canvas_name: string;

  canvas_description: string;

  canvas_status: Status;

  create_time: Date;

  update_time: Date;

  project_id: string;
}
