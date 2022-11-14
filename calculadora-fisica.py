import matplotlib.pyplot as plt

repeticion=int(input("Cuantas veces queres que se repita el codigo: "))
lista=[]
x=[]
y=[]
for i in range(0,repeticion):
    if repeticion == 1:
      singrafico = input("¿Seguro que quiere repetirlo una vez? Si es así no va a haber gráfico (si/no):")
      if singrafico == "no":
        break
    elif repeticion < 1:
      print("No se puede repetir menos de una vez")
      break
    def variables():
        vel= float(input("ingrese la velocidad en m/s: "))
        while vel<0:
          vel= float(input("noooo negativo noo ingrese la velocidad devuelta en m/s y positivo: "))
          if vel>0:
            break
        cabal=float(input("ingrese la distancia del caballo hasta el auto(en metros): "))
        while cabal<0:
          cabal=float(input("noooooo negativo nooo ingrese la distancia del caballo hasta el auto devuelta (en metros y positivo): "))
          if cabal>0:
            break
        fren= float(input("ingrese a que velocidad el auto desacelera(expresalo en negativo): "))
        return calculos(vel, cabal, fren)
    def calculos(vel, cabal, fren):
        while fren>0:
            fren=float(input("NO se puede la desaceleracion numero positivo ponelo en negativo: "))
            if fren<0:
                break
        calc= 0-vel
        tie= calc/fren
        dist= 0+vel*tie+0.5*fren*(tie*tie)
        if dist>cabal:
            print("Te tragaste a un caballo de frente pobre de el :(")
            c = vel + (1/2)*(0-vel)
            c2 = cabal/c
            acel = (0-vel)/c2
            print("nececitabas frenar a ", acel, "m/s2 para no chocarte")
            print("lo chocaste en ",tie, "segundos")
            lista.append(acel)
            lista.append(tie)

        elif dist<=cabal:
            dist2=cabal-dist
            print("te quedaste a",dist2, "metros de chocar al caballo")
            print("Frenaste en ",tie, "segundos")
            lista.append(dist2)
            lista.append(tie)
        y.append(tie)
        x.append(dist)
    variables()

if repeticion > 1:
  print("Los resultados fueron",lista)
  width=0.1
  plt.bar(y,x, width=width, color="brown")
  plt.scatter(y,x, color="grey")
  plt.plot(y,x, color="black")
  plt.ylabel("Distancia en metros")
  plt.xlabel("Tiempo en segundos")
  plt.title("Distancia sobre tiempo")
  plt.show()
