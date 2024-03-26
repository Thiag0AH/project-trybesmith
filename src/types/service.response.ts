type ServiceResponse<T> = SucessRes<T> | ErrorRes;
type ErrorRes = {
  data: {
    message: string
  },
  status: number
};

type SucessRes<T> = {
  data: T,
  status: number };

export default ServiceResponse;