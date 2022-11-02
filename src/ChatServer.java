package src;

import java.io.IOException;
import java.net.ServerSocket;
import java.util.ArrayList;

public class ChatServer implements TCPConnectionListener {
    public static void main(String[] args) {
        new ChatServer();
    }
    private  final ArrayList<TCPConnection> connections=new ArrayList<>();
    private ChatServer(){
        System.out.println("server is running>>>");
       try (ServerSocket serverSocket=new ServerSocket(8189)){
        while (true){
            try {
                new TCPConnection(this,serverSocket.accept());
            }
            catch (IOException e){
                System.out.println("TCPexception"+e);
            }
        }
       } catch (IOException e) {
           throw new RuntimeException(e);
       }


    }

    @Override
    public void onConnectionReady(TCPConnection tcpConnection) {
        connections.add(tcpConnection);
        sendToAllConnection("client connected"+ tcpConnection);

    }

    @Override
    public void onReceiveString(TCPConnection tcpConnection, String value) {
        sendToAllConnection(value);

    }

    @Override
    public void onDisconnect(TCPConnection tcpConnection) {
        connections.remove(tcpConnection);
        sendToAllConnection("client disconected"+ tcpConnection);

    }

    @Override
    public void onException(TCPConnection tcpConnection, Exception e) {
        System.out.println("TCPConnection"+ e);

    }
    private  void  sendToAllConnection(String value){
        System.out.println(value);
        final int cnt=connections.size();
        for (int i=0;i<cnt;i++){
            connections.get(i).sendString(value);
        }
    }
}
