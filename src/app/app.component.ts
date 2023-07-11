import { Component, Inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { UserStatus } from './auth/interfaces/auth.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';

  constructor(private authService: AuthService ) {}

}
