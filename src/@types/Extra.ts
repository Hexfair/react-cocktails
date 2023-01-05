import { Axios } from "axios";
import * as API from '../api/api';
//=========================================================================================================================

export type Extra = {
	client: Axios,
	api: typeof API,
}