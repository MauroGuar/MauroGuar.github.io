def calculate(vel,dist_caballo,freno):
    tiempo=abs(vel/freno)
    distancia_recorrida = vel*tiempo+0.5*freno*(tiempo**2)
    resultados = [distancia_recorrida,tiempo]
    return resultados

def console():
    selec = 9
    while (selec != 0):
        print("======================\nSeleccione una opción (escribiendo el número)\n1. Calculadora\n0. Salir\n======================")
        selec=int(input(""))
        if(selec != 1):
            continue
        else:
            velocidad = abs(float(input("- Ingrese la velocidad en metros/s (será positiva): ")))
            distancia_caballo = abs(float(input("- Ingrese la distancia del auto al caballo en metros (será positiva): ")))
            desaceleracion = -abs(float(input("- Ingrese a que velocidad el auto desacelera en metros/s (será negativa): ")))

            res = calculate(velocidad,distancia_caballo,desaceleracion)
            print(res)

            print("")
            if(res[0]>distancia_caballo):
                print(">- Chocaste con el caballo -<")
                acel_necesaria = -velocidad/(distancia_caballo/(velocidad+0.5*(-velocidad)))
                print("## Necesitabas frenar a ",acel_necesaria,"metros/s ##\n.. Lo chocaste en ",res[1],"segundos ..")
            else:
                print(">- No chocaste con el caballo -<")
                distancia_choque = distancia_caballo-res[0]
                print("## Te quedaste a ",distancia_choque," metros ##\n.. Frenaste en ",res[1]," segundos ..")

#console()