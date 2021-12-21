export class State {
  state_id!: number;
  state_name!: string;
}

export class RootObjectStates {
  states!: State[];
  ttl!: number;
}
