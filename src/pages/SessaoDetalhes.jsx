import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, Clock, Calendar, User, FileText, Edit3, Save, X } from 'lucide-react';
 
export const SessaoDetalhes = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [session, setSession] = useState(null);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editNotes, setEditNotes] = useState('');
    const [editReport, setEditReport] = useState('');
    const [editStatus, setEditStatus] = useState('');
 
    useEffect(() =>{
        const loadSessionData = async () => {
            try {
                const sessionData = await mockApi.getSessionDetails(parseInt(sessionId));
                setSession(sessionData);
                setEditNotes(sessionData.notes || '');
                setEditReport(sessionData.fullReport || '');
                setEditStatus(sessionData.status);
                const patients = await mockApi.getPatients(user.id);
                constPatientData = patients.find(p => p.id === sessionData.sessionData.patientId);
                setPatient(patientData);
            }catch(error){
                console.error('Erro ao carregar dados da sessão', error)
            }finally{
                setLoading(false);
            }
        };
        loadSessionData();
    },[sessionId,user.id, navigate]);
 
    const handleSave = async () => {
        try {
            await mockApi.updateSessionStatus(session.id, editStatus);
            await mockApi.updateSessionNotes(session.id, editNotes, editReport);
            setSession({})
        } catch (error) {
 
        }
    }
 
}
 