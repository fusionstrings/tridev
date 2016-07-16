import {registry} from 'gulp';
import Tridev from './../index';
import settings from './config/settings';

registry(new Tridev(settings));
