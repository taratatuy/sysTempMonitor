Setup:

```bash
    cd ~
    mkdir prod
    cd prod
    git clone https://github.com/taratatuy/sysTempMonitor.git
    cd sysTempMonitor
    chmod ugo+x start
    npm i
```

Add to autostart:

```bash
    cd /etc/systemd/system/
    vi sysTempMonitor.service #Put below code here.
    sudo systemctl daemon-reload
    sudo systemctl enable sysTempMonitor.service
```

sysTempMonitior.service file:

```bash
    [Unit]
    Description=System temprature monitor.
    After=multi-user.target
    [Service]
    Type=idle
    #Care about full path:
    ExecStart=/home/<username>/prod/sysTempMonitor/start
    [Install]
    WantedBy=multi-user.target
```
