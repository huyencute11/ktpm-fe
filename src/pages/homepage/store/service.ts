import axiosInstance from "../../../services/axios";

export const getListClassInSubjectData = async (data: {subjectId:number, semesterId: number}) => {
  try {
    const response = await axiosInstance.get(
      `/credit-class?subjectId=${data.subjectId}&semesterId=${data.semesterId}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getListSubjectData = async (data: object) => {
  try {
    const response = await axiosInstance.get(
      `/subjects`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getListSemesterData = async (data: object) => {
  try {
    // localhost:8080/credit-class/semester
    const response = await axiosInstance.get(
      `/credit-class/semester`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
// @PutMapping("/{classId}")
// public ResponseEntity<?> registerClass(@RequestHeader("Authorization") String token, @PathVariable Long classId) {
//     return ResponseEntity.ok(creditClassService.registerClass(token,classId));
// }
export const registerClass = async(data: number) => {
  try {
    const response = await axiosInstance.put(
      `/credit-class/${data}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getStudentLogin = async (data:object) => {
  try {
    const response = await axiosInstance.get(
      `/students/profile`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}