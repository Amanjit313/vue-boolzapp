/* 

Milestone 1

- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2

- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
- Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3

- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4

- Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5 - opzionale

- Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
- Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

*/

const app = new Vue({
    el: "#app",

    
    data: {
        
        myProfile: {
            myName: "Sofia",
            myAvatar: "_io"
        },
        
        users: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],

        /* Creo un contatore per confrontarlo con l'index */
        activeUser: 0,

        /* Creo un nuovo elemento con tutti i dati necessari per pusharlo dentro al mio array dei messaggi a seconda di quale chat ci troviamo */
        newMessage: {
            date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            message: "",
            status: 'sent'
        },

        /* Creo il mio elemento per generare il messaggio automatico dopo il mio invio del messaggio costum*/
        automaticMessage: {
            date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            message: "OK!",
            status: 'received'
        },

        /* Creo un elemento per il mio filter che mi serve per cercare i miei contatti per nome tramite la search */
        contactSearch: ""

    },
    
    methods: {
        
        /* Funzione per farmi stampare lista contatti l'ultimo messaggio */
        lastMessage(user){
            return user.messages[user.messages.length - 1].message;
        },
        
        /* Funzione per farmi stampare nella lista contatti la data dell'ultimo messaggio */
        lastDate(user){
            return user.messages[user.messages.length - 1].date;
        },
    
        /* Funzione per pushare il mio elemento NewMessage nel mio array messagges dentro l'user, a seconda della chat in cui si trova*/
        addNewMessage(){

            /* Creo la constante index per dire in quale chat mi trovo */
            const index = this.activeUser;

            console.log(index);
            console.log(this.newMessage.message);
            console.log(this.automaticMessage.message);
            
            /* Creo la mia condizione che da una lettera inviata in poi mi stampa il messaggio costum in chat e dopo 1s quello automatico */

            /* Con questa sintassi: nuovoOggetto = {...oggetto} creo un nuovo oggetto clonandone un altro, quindi nuovoOggetto sarà il clone di oggetto*/

            if(this.newMessage.message.length > 0){

                /* Un metodo alternativo per clonarlo */
                const messageToSend = {...this.newMessage};

                /* Sovrasscrivo il mio date, così nel momento dell'invio mi da il date corrente, senza questa sovrasscrizione mi avrebbe dato il date default messo nel mio elemento dentro il data, che mi avrebbe dato il date del momento in cui la mia pagina si era caricata */
                messageToSend.date = dayjs().format("DD/MM/YYYY HH:mm:ss");

                this.users[index].messages.push(messageToSend);
                
                setTimeout(() => {

                    /* Un alternativa su come sovrasscrivere il date */
                    this.automaticMessage.date = dayjs().format("DD/MM/YYYY HH:mm:ss");
                    
                    /* Metodo base di clonaggio */
                    this.users[index].messages.push({...this.automaticMessage});
                }, 1000);

            }
            this.newMessage.message = "";
        },

        /* Funzione per filtrare nella mia chat dei contatti, cercando per nome un contatto */
        contactSearchFunction() {

            this.users.forEach(userFilter =>{
                userFilter.visible = userFilter.name.toUpperCase().includes(this.contactSearch.toUpperCase());
            })
            
          }

    }

})

