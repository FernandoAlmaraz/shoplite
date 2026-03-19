import { Component, signal } from '@angular/core';
import { Products } from './components/products/products';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('shoplite-frontend');
}