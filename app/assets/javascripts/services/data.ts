
export interface BaseAttrs {
  id: string;
}

export interface TimestampAttrs extends BaseAttrs {
  createdAt: string;
  updatedAt: string;
}

  id: string

  constructor(data: BaseAttrs) {
    this.id = data.id
  }
}

  createdAt: string;
  updatedAt: string;

  constructor(data: TimestampAttrs) {
    super(data)

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
