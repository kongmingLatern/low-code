export const enum Status {
  FINISH = '已完成',
  DOING = '进行中',
  NOTSTART = '未开始',
}

export class CreateCanvasDto {
  canvas_id: string;

  canvas_name: string;

  canvas_description: string;

  canvas_status: Status;

  canvas_info: string;

  create_time: Date;

  update_time: Date;
}
