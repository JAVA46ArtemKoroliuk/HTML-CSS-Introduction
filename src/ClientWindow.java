package src;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

public class ClientWindow extends JFrame implements ActionListener, TCPConnectionListener {
    private  final String IPADRES="192.168.1.155";
    private final int PORT=8189;
    private  final int WIDTH=600;
    private  final int HEIGHT=400;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new ClientWindow();
            }
        });
    }
    private final JTextArea log=new JTextArea();
    private final JTextField fieldNickName=new JTextField("art");
    private final JTextField fieldInput=new JTextField();
    private TCPConnection connection;

    private ClientWindow(){
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setSize(WIDTH,HEIGHT);
        setAlwaysOnTop(true);
        log.setEditable(false);
        log.setLineWrap(true);
        fieldInput.addActionListener(this);
        add(log, BorderLayout.CENTER);
        add(fieldInput,BorderLayout.SOUTH);
        add(fieldNickName,BorderLayout.NORTH);
        setVisible(true);
        try {
            connection=new TCPConnection(this,IPADRES,PORT);
        } catch (IOException e) {
            printMsg("connection exception"+e);
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String msg=fieldInput.getText();
        if (msg.equals("")) return;
        fieldInput.setText(null);
        connection.sendString(fieldNickName.getText()+":"+ msg);

    }

    @Override
    public void onConnectionReady(TCPConnection tcpConnection) {
        printMsg("connection ready");

    }

    @Override
    public void onReceiveString(TCPConnection tcpConnection, String value) {
        printMsg(value);

    }

    @Override
    public void onDisconnect(TCPConnection tcpConnection) {
        printMsg("connection close");

    }

    @Override
    public void onException(TCPConnection tcpConnection, Exception e) {
        printMsg("connection exception"+e);

    }
    private synchronized void printMsg(String msg){
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                log.append(msg +"\n");
                log.setCaretPosition(log.getDocument().getLength());
            }
        });
    }
}
