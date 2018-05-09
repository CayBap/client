import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { UsersService } from '../api';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  signUpName: string = '';
  signUpStudentId: string = '';
  signUpPhone: string = '';
  signUpPassword: string = '';
  signUpRePassword: string = '';

  constructor(private socket: SocketService,private user:UsersService) {}

  ngOnInit() {}
  
  signUp() {
    if (this.signUpName.length <= 0) {
      alert('Tên không hợp lệ hoặc để trống');
      return;
    }
    if (this.signUpStudentId.length < 10 || this.signUpStudentId.length > 12) {
      alert('Mã sinh viên không đúng');
      return;
    }
    if (this.signUpPhone.length < 10 || this.signUpPhone.length > 12) {
      alert('Số điện thoại không đúng');
      return;
    }

    if (this.signUpPassword.length < 6 || this.signUpRePassword.length < 6) {
      alert('Mật khẩu quá ngắn');
      return;
    }

    if (this.signUpPassword != this.signUpRePassword) {
      alert('Nhập lại mật khẩu không trùng');
      return;
    }

    this.user
      .signUp(
        this.signUpPhone,
        this.signUpStudentId,
        this.signUpPassword,
        this.signUpName
      )
      .then(res => {
        if (res.code == 3) {
          alert('Đăng ký thành công');
         
        } else {
          alert(res.message);
        }
      })
      .catch(err => alert('Đăng ký thất bại, vui lòng thử lại'));
  }
}
