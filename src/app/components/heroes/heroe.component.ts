import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {
  
    heroe:Heroe = {
    nombre:"",
    sexo:"Masculino",
    correo:"",
    telefono:"",
    bio:""
  }

  nuevo:boolean = false;
  id:string;

  constructor(private _heroesService:HeroesService,
              private router:Router,
              private route:ActivatedRoute ) {

      this.route.params
          .subscribe( parametros=>{
                
                this.id = parametros['id']
                if( this.id != "nuevo" ){

                  this._heroesService.getHeroe(this.id)
                        .subscribe( heroe =>this.heroe = heroe )
                }
              }
            );
              }

  ngOnInit() {
  }

  guardar(){

    if ( this.id == "nuevo"){
      // insertando 
      this._heroesService.nuevoHeroe( this.heroe )
          .subscribe( data=>{
            this.router.navigate(['/heroe'])
          },
          error=> console.error(error));
    }else{
      // actualizando
      this._heroesService.actualizarHeroe( this.heroe, this.id )
          .subscribe( data=>{
            this.router.navigate(['/heroe'])
          },
          error=> console.error(error));
    }
  }

  agregarNuevo( forma:NgForm ){

    this.router.navigate(['/heroe', 'nuevo']);

    forma.reset({
      casa:"Marvel"
    });
  }


}
