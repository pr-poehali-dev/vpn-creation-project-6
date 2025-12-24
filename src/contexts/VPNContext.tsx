import React, { createContext, useContext, useState, useEffect } from 'react';

interface Server {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  load: number;
  ping: number;
}

interface VPNContextType {
  isConnected: boolean;
  isConnecting: boolean;
  selectedServer: Server | null;
  uploadSpeed: number;
  downloadSpeed: number;
  dataSent: number;
  dataReceived: number;
  connectionTime: number;
  adBlockEnabled: boolean;
  malwareProtectionEnabled: boolean;
  toggleConnection: () => void;
  selectServer: (server: Server) => void;
  toggleAdBlock: () => void;
  toggleMalwareProtection: () => void;
}

const VPNContext = createContext<VPNContextType | undefined>(undefined);

export const useVPN = () => {
  const context = useContext(VPNContext);
  if (!context) {
    throw new Error('useVPN must be used within VPNProvider');
  }
  return context;
};

export const VPNProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [dataSent, setDataSent] = useState(0);
  const [dataReceived, setDataReceived] = useState(0);
  const [connectionTime, setConnectionTime] = useState(0);
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);
  const [malwareProtectionEnabled, setMalwareProtectionEnabled] = useState(true);

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setUploadSpeed(Math.random() * 10 + 5);
        setDownloadSpeed(Math.random() * 50 + 20);
        setDataSent(prev => prev + Math.random() * 0.5);
        setDataReceived(prev => prev + Math.random() * 2);
        setConnectionTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setUploadSpeed(0);
      setDownloadSpeed(0);
      setConnectionTime(0);
    }
  }, [isConnected]);

  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      setDataSent(0);
      setDataReceived(0);
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
      }, 2000);
    }
  };

  const selectServer = (server: Server) => {
    setSelectedServer(server);
  };

  const toggleAdBlock = () => {
    setAdBlockEnabled(prev => !prev);
  };

  const toggleMalwareProtection = () => {
    setMalwareProtectionEnabled(prev => !prev);
  };

  return (
    <VPNContext.Provider
      value={{
        isConnected,
        isConnecting,
        selectedServer,
        uploadSpeed,
        downloadSpeed,
        dataSent,
        dataReceived,
        connectionTime,
        adBlockEnabled,
        malwareProtectionEnabled,
        toggleConnection,
        selectServer,
        toggleAdBlock,
        toggleMalwareProtection,
      }}
    >
      {children}
    </VPNContext.Provider>
  );
};
