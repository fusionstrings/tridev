import {registry} from 'gulp';
import Tridev from './../dist';
import settings from './config/settings';

registry(new Tridev(settings));
