import {
  GET_USER,
  USEREDIT_VALUE,
  UPDATE_USER,
  UPDATE_PIX,
  USER_EDITPIX
} from './types';
import axios from 'axios';
import Swal from 'sweetalert2';

export const getuserInfo = id => {
  console.log(id);
  return dispatch => {
    axios
      .get(`https://pastquestions.xyz/api/v1/user/show?id=${id}`)
      .then(res => {
        dispatch({
          type: GET_USER,
          payload: res.data.data
        });
        console.log(res.data.data);
      })
      .catch(err => console.log(err, 'i am err'));
  };
};

export const usereditValue = payload => {
  return dispatch => {
    dispatch({
      type: USEREDIT_VALUE,
      payload: payload
    });
  };
};

export const updateUser = (name, phone, description, id) => {
  let data = {
    name,
    phone,
    description,
    id
  };

  return dispatch => {
    axios
      .post('https://pastquestions.xyz/api/v1/user/edit', data)
      .then(res => {
        dispatch({
          type: UPDATE_USER,
          payload: res.data
        });
        Swal.fire({
          type: 'success',
          text: res.data ? res.data.message : 'Profile Updated Successfully'
        });
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.response
            ? err.response.data.message
            : 'Something went wrong',
          confirmButtonText: 'Ok'
        });
      });
  };
};

export const usereditPix = image => {
  return dispatch => {
    dispatch({
      type: USER_EDITPIX,
      payload: image
    });
  };
};

/**export const updatePix = (photos, id) => {
  let data = {
    photos,
    id
  };

  let dataToServer = new FormData();
  dataToServer.set("id", id);
  dataToServer.append("photos", [photos]);

  return dispatch => {
    axios({
      method: "post",
      url: "http://qpast.ng/api/v1/user/edit",
      data: dataToServer,
      config: { header: { "Content-Type": "multipart/form-data" } }
    })
      .then(res => {
        dispatch({
          type: UPDATE_PIX,
          payload: res.data
        });
        if (res.data) {
          console.log(res.data.message);
        }
      })
      .catch(err => console.log(err, "i am err"));
  };
};*/

export const updatePix = photo => {
  return dispatch => {
    axios
      .post('https://pastquestions.xyz/api/v1/user/edit', { img_url: photo })
      .then(res => {
        dispatch({
          type: UPDATE_PIX,
          payload: res.data
        });
        if (res.data) {
          console.log(res.data.message);
        }
      })
      .catch(err => console.log(err, 'i am err'));
  };
};
