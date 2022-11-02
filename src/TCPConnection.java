package src;
import java.io.*;
import java.net.Socket;

public class TCPConnection {
    private final Socket socket;
    private  Thread rxThread;
    private final TCPConnectionListener eventListener;
    private final BufferedReader in;
    private final BufferedWriter out;
    public TCPConnection(TCPConnectionListener eventListener,String ipAddres, int port) throws IOException {
        this(eventListener,new Socket(ipAddres,port));
    }

    public TCPConnection(TCPConnectionListener eventListener,Socket socket)
            throws IOException {
        this.eventListener = eventListener;
        this.socket = socket;
        in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        out=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        rxThread=new Thread(() -> {
            try {
                eventListener.onConnectionReady(TCPConnection.this);
                while (rxThread.isInterrupted()){
                    String msg=in.readLine();
                    eventListener.onReceiveString(TCPConnection.this,msg);
                }
            } catch (IOException e) {
                eventListener.onException(TCPConnection.this,e);
            }
            finally {
                eventListener.onDisconnect(TCPConnection.this);
            }
        });
        rxThread.start();
    }
    public synchronized void sendString(String value){
        try {
            out.write(value + "\r\n");
            out.flush();
        } catch (IOException e) {
            eventListener.onException(TCPConnection.this,e);
            disconnect();
        }

    }
    public  synchronized void disconnect() {
        rxThread.interrupt();
        try {
            socket.close();
        } catch (IOException e) {
            eventListener.onException(TCPConnection.this,e);
        }
    }
    @Override
    public  String toString(){
        return "TcpConnection :"+ socket.getInetAddress()+":" + socket.getPort();
    }
}